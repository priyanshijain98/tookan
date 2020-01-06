import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
//const serviceAccount = require("servplatform-d4668-firebase-adminsdk-rqyid-c976dca51e.json");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://servplatform-d4668.firebaseio.com'
  });
 
//admin.initializeApp(functions.config().firebase);

import * as tookanFunctions from './tookan-operations/index'

export const firestoreInstance = admin.firestore();

export const onTaskCreate = functions.firestore
    .document('task/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onTaskCreateTriggered',)
        return tookanFunctions.createTookanTask(snapshot,context);
    });
 
export const onTaskEdit = functions.firestore
    .document('task/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onTaskEditTriggered',)
        return tookanFunctions.edittookantask(snapshot,context);
    });    

export const onGetAllAgents = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onGetAllAgentsTriggered',)
        return tookanFunctions.getAllTookanAgents(snapshot,context);
    });        

export const onAddAgents = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onAddAgentsTriggered',)
        return tookanFunctions.AddTookanAgents(snapshot,context);
    });            

export const onEditAgents = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onEditAgentsTriggered',)
        return tookanFunctions.EditTookanAgents(snapshot,context);
    }); 
    
export const onBlockUnblockAgents = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onBlockUnblockAgentsTriggered',)
        return tookanFunctions.BlockorUnblockTookanAgents(snapshot,context);
    }); 

export const onDeleteAgents = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onDeleteAgentsTriggered',)
        return tookanFunctions.DeleteTookanAgents(snapshot,context);
    });
    
export const onViewAgentsProfile = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onViewAgentsProfileTriggered',)
        return tookanFunctions.ViewTookanAgentsProfile(snapshot,context);
    }); 

export const onUpdateAgentsTag = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onUpdateAgentsTagTriggered',)
        return tookanFunctions.UpdateTookanAgentTags(snapshot,context);
    });  
    
export const onGetAgentsTag = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onGetAgentsTagTriggered',)
        return tookanFunctions.GetTookanAgentTags(snapshot,context);
    }); 
    
export const onGetAgentsLogs = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onGetAgentsLogsTriggered',)
        return tookanFunctions.GetTookanAgentLogs(snapshot,context);
    }); 
    
export const onGetAgentsLocation = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onGetAgentsLocationTriggered',)
        return tookanFunctions.GetTookanAgentLocation(snapshot,context);
    });  

export const onSendAgentsNotification = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onSendAgentsNotificationTriggered',)
        return tookanFunctions.SendAgentNotification(snapshot,context);
    });    

export const onGetAgentsSchedule = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onGetAgentsScheduleTriggered',)
        return tookanFunctions.GetTookanAgentSchedule(snapshot,context);
    }); 
    
export const onAssignAgentsTask = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onAssignAgentsTaskTriggered',)
        return tookanFunctions.AssignTookanAgentTask(snapshot,context);
    });  