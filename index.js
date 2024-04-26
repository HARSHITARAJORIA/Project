import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';
import session from 'express-session';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized:true
}));
const db = new pg.Client({
    user:"postgres",
    host: "localhost",
    database:process.env.data_bs,
    password:process.env.post_pass,
    port: process.env.dbms_port
});
db.connect();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/courses",async(req,res)=>{
    res.render("courses.ejs")
 });
 app.post("/about",async(req,res)=>{
    res.render("about.ejs")
 });
 app.post("/login",async(req,res)=>{
    res.render("login.ejs")
 });
 app.post("/contact",async(req,res)=>{
    res.render("contact.ejs")
 });
 app.post("/home",async(req,res)=>{
    res.redirect("/");
 });
 app.post('/log',async(req,res)=>{
    req.session.username=req.body.username;
    req.session.inppass= req.body.pass;
    if(req.session.username){
      const userData = await db.query("select name, math_marks, science_marks, sst_marks, hindi_marks, english_marks, total_marks, grade,registration_num, email,contact,address,course,image from school where username = $1",[req.session.username]);
      const name = userData.rows[0].name;
      const math = userData.rows[0].math_marks;
      const sc = userData.rows[0].science_marks;
      const sst = userData.rows[0].sst_marks;
      const hin = userData.rows[0].hindi_marks;
      const eng = userData.rows[0].english_marks;
      const tot = userData.rows[0].total_marks;
      const gra = userData.rows[0].grade;
      const reg = userData.rows[0].registration_num;
      const em = userData.rows[0].email;
      const con = userData.rows[0].contact;
      const add = userData.rows[0].address;
      const cou = userData.rows[0].course;
      const img = userData.rows[0].image;
     
      res.render('login_index.ejs',{
         Name: name,
         Math : math,
         Sc : sc,
         Sst : sst,
         Hin : hin,
         Eng : eng,
         Tot: tot,
         Gra : gra,
         Reg: reg,
         mail: em,
         Contact: con,
         Address: add,
         Course: cou,
         Image: img
      });
      }else{
         res.render("index.ejs")
      }
 });
 app.get("/password",(req,res) => {
      res.render('password.ejs')
 });
 app.get("/exam",(req,res) => {
   res.render('exam.ejs')
});
app.get("/timetable",(req,res) => {
   res.render('timetable.ejs')
});
app.get("/index", async (req,res)=>{
   if(req.session.username){
   const userData = await db.query("select name, math_marks, science_marks, sst_marks, hindi_marks, english_marks, total_marks, grade,registration_num, email,contact,address,course,image from school where username = $1",[req.session.username]);
   const name = userData.rows[0].name;
   const math = userData.rows[0].math_marks;
   const sc = userData.rows[0].science_marks;
   const sst = userData.rows[0].sst_marks;
   const hin = userData.rows[0].hindi_marks;
   const eng = userData.rows[0].english_marks;
   const tot = userData.rows[0].total_marks;
   const gra = userData.rows[0].grade;
   const reg = userData.rows[0].registration_num;
   const em = userData.rows[0].email;
   const con = userData.rows[0].contact;
   const add = userData.rows[0].address;
   const cou = userData.rows[0].course;
   const img = userData.rows[0].image;
  
   res.render('login_index.ejs',{
      Name: name,
      Math : math,
      Sc : sc,
      Sst : sst,
      Hin : hin,
      Eng : eng,
      Tot: tot,
      Gra : gra,
      Reg: reg,
      mail: em,
      Contact: con,
      Address: add,
      Course: cou,
      Image: img
   });
   }else{
      res.render("index.ejs")
   }
});
 app.get("/",(req,res)=>{
    res.render('index.ejs');
 })
 app.listen(process.env.PORT,()=>{
console.log("Server started on port");
 })