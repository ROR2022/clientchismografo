


const nodeEnv = process.env.NODE_ENV;
export const hostURL = nodeEnv==='development'?process.env.NEXT_PUBLIC_DEV_ENV: process.env.NEXT_PUBLIC_PRD_ENV;


export const mainAppTitle = 'Goosip RorApp';

