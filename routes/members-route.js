import express from "express";
import {Router} from "express";
import Member from "../models/member.js";
const router = Router();


//Registering a new member
router.post("/signup", async (req,res)=>{
    const member= new Member({
        mId: req.body.mId ,
        fName: req.body.fName ,
        lName: req.body.lName ,
        address: req.body.address ,
        contact: req.body.contact ,
        email: req.body.email ,
        mExpireDate: req.body.mExpireDate ,
        chapter: req.body.chapter ,
        dob: req.body.dob ,
        living: req.body.living ,
        role: req.body.role ,
    });
    try{
        const newMember = await member.save();
        res.status(201).json(newMember);
    }
    catch(e){
        res.status(400).json({message: e.message});
    }
});

//Logging in
//router.post("/login", (req, res) =>{ });


//updating a members profile--restricted only to member themselves
router.patch("/:mid", getMember, async (req,res) =>{
    try{
    if (req.params.mid !== res.member.mId){
        return res.status(403).json({message: "Your not authorized to update this members profile."});
    }
    const updatedMember =await res.member.save();
    res.status(200).json(updatedMember);
}
catch(e){
    res.status(400).json({message: e.message});
}
});

//get a members profile---available to all members themselves
router.get("/:mid", getMember, (req,res) => {
    res.json(res.member);
});

//deleting a member--- restrticted only to admin
router.delete("/:mid", getMember, async (req, res) => {
    try{
     await res.member.remove();
     res.status(200).json({message: "Member deleted successfully" });
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
});

// updating a members profile--restricted only to admins
// router.patch("/:mId", getMember, async (req,res)=>{});

//get all members profile
router.get('/',async (req,res) => {
    try{
        const members =await Member.find();
        res.status(200).json(members);
    }catch (e){
        console.error(e);
        res.status(500).json({message: e.message});
    }
});

//middleware is created to use in another api calls
async function getMember (req, res, next){
    let member;
try{
    member = await Member.findOne({mId: req.params.mid});
    if(member == null){
        return res.status(404).json({});
    }
}
catch(e){
    console.error(e);
    return res.status(500).json({message: e.message});
}
res.member= member;
next();
};


export default router;
