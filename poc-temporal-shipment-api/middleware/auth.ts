export const token   = (req:any, res:any, next:any) =>{
  console.log(" I am inside the Middleware");
  next();
}
