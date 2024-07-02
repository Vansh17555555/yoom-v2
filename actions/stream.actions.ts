"use server";

import { StreamClient } from "@stream-io/node-sdk";
import { userid } from "@/components/userid";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret=process.env.NEXT_PUBLIC_STREAM_KEY
export const tokenProvider=async()=>{

    if(!apiKey) throw new Error("no API key");
    if(!apiSecret) throw new Error("no API secret");
    const client=new StreamClient(apiKey,apiSecret);
    const exp=Math.round(new Date().getTime()/1000)+60*60;
    const issued=Math.floor(Date.now()/1000)-60;
    const token=client.createToken(userid,exp,issued)
    return token;
}