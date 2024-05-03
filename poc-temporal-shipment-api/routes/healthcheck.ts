export const healthCheck =  (req:any, res:any) => {
    const healthcheck = {
        uptime:process.uptime(),
        responsetime:process.hrtime(),
        message:'OK',
        timestamp:Date.now()
    };
    try{
        res.send(healthcheck)
    } catch(e) {
        healthcheck.message = e;
        res.status(503).send()
    }
}



