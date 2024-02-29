import express, { Router } from 'express';
import { getParty, getPartyList } from '../controller/party.Controller';
// import { addParty } from '../controller/party.Controller';

const partyRouter:Router = express.Router();
partyRouter.get('/todayPartyList',getParty)
partyRouter.get('/listOfParty',getPartyList)
// partyRouter.post('/',addParty
// );
export {partyRouter};
