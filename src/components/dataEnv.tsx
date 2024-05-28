


const nodeEnv = process.env.NODE_ENV;
export const hostURL = nodeEnv==='development'?process.env.NEXT_PUBLIC_DEV_ENV: process.env.NEXT_PUBLIC_PRD_ENV;

export const VAPID_PUBLIC_KEY=process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;


export const mainAppTitle = 'Goosip RorApp';


