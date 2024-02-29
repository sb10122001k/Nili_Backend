import { Request, Response } from 'express';
import { scrapeEvents } from '../utils/scrapEvent';
import { PartyList } from '../models/partyList.Schema';


// export const addParty =async() =>{

// }
export const getParty = async(req:Request,res:Response)=>{
    try {
        console.log("Data")
        const eventData = await scrapeEvents ();
        console.log(eventData,"DAta")
        eventData.map(async(item)=>{
            await PartyList.create({
                title:item.title,
                date:item.date,
                location:item.location,
                link:item.link,
                imageURL:item.imageURL
            })
        })
        res.status(201).json({data:eventData})
        
    } catch (error) {
        res.status(500).json({message:error})
    }
}
export const getPartyList = async(req:Request,res:Response) =>{
    try {
        const data = await PartyList.findAll()
        res.status(200).json({data:data})
    } catch (error) {
        res.status(500).json({message:error})
    }
}
