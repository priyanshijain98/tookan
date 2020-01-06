import {
    TOOKAN_API_KEY,TASKS, AGENTS
} from "../constants";
import {firestoreInstance} from "../index";
import * as Tookan from "tookan-api";
const client = new Tookan.Client({api_key: TOOKAN_API_KEY});

export async function createTookanTask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Create Tookan task for task id ', taskId, newValue);

    const options = {
        api_key:TOOKAN_API_KEY,
        order_id:newValue.order_id,
        job_description:newValue.job_description,
        customer_email:newValue.customer_email,
        customer_username:newValue.customer_username,
        customer_phone:newValue.customer_phone,
        customer_address:newValue.customer_address,
        latitude:newValue.latitude,
        longitude:newValue.longitude,
        job_delivery_datetime:newValue.job_delivery_datetime,
        custom_field_template:newValue.custom_field_template,
        meta_data:newValue.pickup_meta_data,
        team_id:newValue.team_id,
        auto_assignment:newValue.auto_assignment,
        has_pickup:newValue.has_pickup,
        has_delivery:newValue.has_delivery,
        layout_type:newValue.layout_type,
        tracking_link:newValue.tracking_link,
        timezone:newValue.timezone,
        fleet_id:newValue.fleet_id,
        ref_images:newValue.p_ref_images,
        notify:newValue.notify,
        tags:newValue.tags,
        geofence:newValue.geofencing
    };
    //Create task in tookan
    console.log('Creating tookan task for options: ', options);
    return client.createTask(options).then(res => {
        return updateTaskOnTaskCreate(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan Create task failed: " + err)
    });
}

async function updateTaskOnTaskCreate (res,taskId): Promise<string> {
    console.log("Tookan task created with response successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Update Task based on response for taskId started",taskId);
    console.log("Updated content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data).then(() => console.log("task updated based on tookan response for taskId:", taskId)).catch(err => console.log("Update task based on task id failed for: " + err));
	return taskId
}

export async function edittookantask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Edit Tookan task for task id ', taskId, newValue);

    const options = {
        customer_email: newValue.customer_email,
        customer_username: newValue.customer_username,
        customer_phone: newValue.customer_phone,
        customer_address: newValue.customer_address,
        latitude: newValue.latitude,
        longitude: newValue.longitude,
        job_description: newValue.job_description,
        job_pickup_datetime: newValue.job_pickup_datetime,
        job_delivery_datetime: newValue.job_delivery_datetime,
        has_pickup: newValue.has_pickup,
        has_delivery: newValue.has_delivery,
        layout_type: newValue.layout_type,
        tracking_link: newValue.tracking_link,
        timezone: newValue.timezone,
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        notify: newValue.notify
      };
    //Edit task in tookan
    console.log('Editing tookan task for options: ', options);
    return client.editTask(options).then(res => {
        return updateTaskOnTaskEdit(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan Edit task failed: " + err)
    });
}

async function updateTaskOnTaskEdit (res,taskId): Promise<string> {
    console.log("Tookan task edited with response successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Update Task based on response for taskId started",taskId);
    console.log("Updated content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data).then(() => console.log("task updated based on tookan response for taskId:", taskId)).catch(err => console.log("Update task based on task id failed for: " + err));
	return taskId
}

export async function deleteTookanTask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Delete Tookan task for task id ', taskId, newValue);

    const options = {
        api_key:TOOKAN_API_KEY,
        job_id: newValue.job_id
    };
    //delete task in tookan
    console.log('Deleting tookan task for options: ', options);
    return client.deleteTask(options).then(res => {
        return updateTaskDeletion(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan Deletion task failed: " + err)
    });
}

async function updateTaskDeletion (res,taskId): Promise<string> {
    console.log("Tookan task deleted successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Deleting Task based on response for taskId started",taskId);
    console.log("Task Deleted for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data).then(() => console.log("task deleted based on tookan response for taskId:", taskId)).catch(err => console.log("Task Deletion based on task id failed for: " + err));
	return taskId
}

export async function updateTookanTaskstatus(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Update Tookan task status for task id ', taskId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        job_status: newValue.job_status
      };
    //Update task status in tookan
    console.log('Updating tookan task status for options: ', options);
    return client.updateTaskStatus(options).then(res => {
        return updateTookanTaskStatus(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan task status update failed: " + err)
    });
}

async function updateTookanTaskStatus(res,taskId): Promise<string> {
    console.log("Tookan task status updated successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Update Task status based on response for taskId started",taskId);
    console.log("Updated content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data).then(() => console.log("task status updated based on tookan response for taskId:", taskId)).catch(err => console.log("Updating task status based on task id failed for: " + err));
	return taskId
}

export async function Starttookantask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Start Tookan task for task id ', taskId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        job_status: newValue.job_status
      };
    //Start task in tookan
    console.log('starting tookan task for options: ', options);
    return client.startTask(options).then(res => {
        return tookantaskstart(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan task start failed: " + err)
    });
}

async function tookantaskstart(res,taskId): Promise<string> {
    console.log("Tookan task started with response successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Update Task based on response for taskId started",taskId);
    console.log("Updated content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data).then(() => console.log("task started based on tookan response for taskId:", taskId)).catch(err => console.log("Task Start based on task id failed for: " + err));
	return taskId
}

export async function getAllTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering get all tookan agents for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        tags: newValue.tags,
        name: newValue.name,
        fleet_ids: newValue.fleet_id,
        include_any_tag: newValue.include_any_tag,
        status: newValue.status,
        fleet_type: newValue.fleet_type
      };
    //Get all agents in tookan
    console.log('Getting all tookan agents for options: ', options);
    return client.getAllAgents(options).then(res => {
        return tookangetallagents(res,agentId);   
    })
    .catch(err => {
        console.log("Tookan get all agents task failed: " + err)
    });
}

async function tookangetallagents(res,agentId): Promise<string> {
    console.log("Tookan get all agents with response successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Getting all agents based on response for agentId started",agentId);
    console.log("All agents for agent_id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Getting all agents based on agent Id:", agentId)).catch(err => console.log("Getting all agents based on agent id failed for: " + err));
	return agentId
}

export async function AddTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering add tookan agent for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        email: newValue.email,
        phone: newValue.phone,
        transport_type: newValue.transport_type,
        transport_desc: newValue.transport_desc,
        license: newValue.license,
        color: newValue.color,
        timezone: newValue.timezone,
        team_id: newValue.team_id,
        password: newValue.password,
        username: newValue.username,
        first_name: newValue.first_name,
        last_name: newValue.last_name,
        rule_id: newValue.rule_id
      };
    //Add agents in tookan
    console.log('Adding tookan agents for options: ', options);
    return client.addAgent(options).then(res => {
        return tookanaddagents(res,agentId);   
    })
    .catch(err => {
        console.log("Tookan adding agents task failed: " + err)
    });
}

async function tookanaddagents(res,agentId): Promise<string> {
    console.log("Tookan add agents with response successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Adding agents based on response for agentId started",agentId);
    console.log("Agent added for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Adding agents based on agent Id:", agentId)).catch(err => console.log("Update agents based on agent id failed for: " + err));
	return agentId
}

export async function EditTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering edit tookan agent for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
        email: newValue.email,
        phone: newValue.phone,
        transport_type: newValue.transport_type,
        transport_desc: newValue.transport_desc,
        license: newValue.license,
        color: newValue.color,
        timezone: newValue.timezone,
        team_id: newValue.team_id,
        password: newValue.password,
        first_name: newValue.first_name,
        last_name: newValue.last_name,
        rule_id: newValue.rule_id
      };
    //Edit agents in tookan
    console.log('Editing tookan agents for options: ', options);
    return client.editAgent(options).then(res => {
        return tookaneditagents(res,agentId);   
    })
    .catch(err => {
        console.log("Tookan editing agents task failed: " + err)
    });
}

async function tookaneditagents(res,agentId): Promise<string> {
    console.log("Tookan edit agents with response successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Editing agents information based on response for agentId started",agentId);
    console.log("Agent information edited for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Editing agent information based on agent Id:", agentId)).catch(err => console.log("Editing agents information based on agent id failed for: " + err));
	return agentId
}

export async function BlockorUnblockTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Block or Unblock tookan agent for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
        block_status: newValue.block_status
      };
    
      //Block or Unblock agents in tookan
    console.log('Blocking or unblocking tookan agents for options: ', options);
    return client.blockAndUnblockAgent(options).then(res => {
        return tookanblockorunblockagents(res,agentId);   
    })
    .catch(err => {
        console.log("Tookan blocking or unblocking agents task failed: " + err)
    });
}

async function tookanblockorunblockagents(res,agentId): Promise<string> {
    console.log("Tookan agents blocked or unblocked successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Blocking or Unblocking agent based on response for agentId started",agentId);
    console.log("Agent blocked or unblocked for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Editing agent block/unblock status based on agent Id:", agentId)).catch(err => console.log("Editing agents block/unblock status based on agent id failed for: " + err));
	return agentId
}

export async function DeleteTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Block or Unblock tookan agent for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
      };
    
      //Delete agents in tookan
    console.log('Deleting tookan agents for options: ', options);
    return client.deleteAgent(options).then(res => {
        return tookandeleteagents(res,agentId);   
    })
    .catch(err => {
        console.log("Tookan deleting agents task failed: " + err)
    });
}

async function tookandeleteagents(res,agentId): Promise<string> {
    console.log("Tookan agents deleted successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Deleting agent based on response for agentId started",agentId);
    console.log("Agent Deleted for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Deleting agent successfully based on agent Id:", agentId)).catch(err => console.log("Deleting agents based on agent id failed for: " + err));
	return agentId
}

export async function ViewTookanAgentsProfile(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering view tookan agent profile for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
      };
    
      //View agents profile in tookan
    console.log('Viewing profile of tookan agents for options: ', options);
    return client.viewAgentProfile(options).then(res => {
        return tookanviewagentsprofile(res,agentId);   
    })
    .catch(err => {
        console.log("Viewing tookan agents profile task failed: " + err)
    });
}

async function tookanviewagentsprofile(res,agentId): Promise<string> {
    console.log("Tookan agents profile viewed successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Viewing agent profile based on response for agentId started",agentId);
    console.log("Agent profile viewed for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Profile of tookan agent viewed successfully based for agent Id:", agentId)).catch(err => console.log("Viewing agents profile based on agent id failed for: " + err));
	return agentId
}

export async function UpdateTookanAgentTags(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Update Tookan agent Tags profile for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
        tags: newValue.tags
      };
    
      //Update Tookan agents tags in tookan
    console.log('Updating tags of tookan agents for options: ', options);
    return client.updateAgentTags(options).then(res => {
        return tookanupdateagenttags(res,agentId);   
    })
    .catch(err => {
        console.log("Updating tookan agents tags task failed: " + err)
    });
}

async function tookanupdateagenttags(res,agentId): Promise<string> {
    console.log("Tookan agents tags updated successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Updating agent tags based on response for agentId started",agentId);
    console.log("Agent tags updated for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Tags of tookan agent updated successfully based on agent Id:", agentId)).catch(err => console.log("Updating agents tags based on agent id failed for: " + err));
	return agentId
}

export async function GetTookanAgentTags(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Get Tookan agent Tags profile for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
      };
    
      //Get agents tags in tookan
    console.log('Get tags of tookan agents for options: ', options);
    return client.getAgentTags(options).then(res => {
        return tookangetagenttags(res,agentId);   
    })
    .catch(err => {
        console.log("Get tookan agents tags task failed: " + err)
    });
}

async function tookangetagenttags(res,agentId): Promise<string> {
    console.log("Tookan agent tags viewed successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Get agent tags based on response for agentId started",agentId);
    console.log("Agent tags viewed for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Tags of tookan agent viewed successfully based on agent Id:", agentId)).catch(err => console.log("Getting agents tags based on agent id failed for: " + err));
	return agentId
}

export async function GetTookanAgentLogs(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Get Tookan agent logs for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        date: newValue.date,
        team_ids: newValue.team_ids
      };
    
      //Get agents logs in tookan
    console.log('Get logs of tookan agents for options: ', options);
    return client.getAgentLogs(options).then(res => {
        return tookangetagentlogs(res,agentId);   
    })
    .catch(err => {
        console.log("Get tookan agents logs task failed: " + err)
    });
}

async function tookangetagentlogs(res,agentId): Promise<string> {
    console.log("Tookan agent logs viewed successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Get agent logs based on response for agentId started",agentId);
    console.log("Agent logs viewed for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Logs of tookan agent viewed successfully based on agent Id:", agentId)).catch(err => console.log("Getting agents logs based on agent id failed for: " + err));
	return agentId
}

export async function GetTookanAgentLocation(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Get Tookan agent location for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id
      };
    
      //Get agents location in tookan
    console.log('Get location of tookan agents for options: ', options);
    return client.getAgentLocation(options).then(res => {
        return tookangetagentlocation(res,agentId);   
    })
    .catch(err => {
        console.log("Get tookan agents location task failed: " + err)
    });
}

async function tookangetagentlocation(res,agentId): Promise<string> {
    console.log("Tookan agent location viewed successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Get agent location based on response for agentId started",agentId);
    console.log("Agent location viewed for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Location of tookan agent viewed successfully based on agent Id:", agentId)).catch(err => console.log("Getting agents location based on agent id failed for: " + err));
	return agentId
}

export async function SendAgentNotification(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Send Tookan agent Notification for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
        message: newValue.message
      };
    
      //Send agents Notification in tookan
    console.log('Send notification to tookan agents for options: ', options);
    return client.sendNotificationToAgent(options).then(res => {
        return tookannotificationstoagents(res,agentId);   
    })
    .catch(err => {
        console.log("Send notifications to tookan agents task failed: " + err)
    });
}

async function tookannotificationstoagents(res,agentId): Promise<string> {
    console.log("Notification sent to agent successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Sending Notifications to agent based on response for agentId started",agentId);
    console.log("Notification sent to agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Notification to tookan agent sent successfully based on agent Id:", agentId)).catch(err => console.log(" Sending Notifications task based on agent id failed for: " + err));
	return agentId
}

export async function GetTookanAgentSchedule(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Get Tookan agent Schedule for agent Id', agentId, newValue);

    const options = {
      api_key: TOOKAN_API_KEY,
      local_date_time: newValue.local_date_time,
      limit: newValue.limit
    };
    
      //Get agents Schedule in tookan
    console.log('Get Schedule of tookan agents for options: ', options);
    return client.getAgentSchedule(options).then(res => {
        return tookangetagentschedule(res,agentId);   
    })
    .catch(err => {
        console.log("Get Schedule of tookan agents task failed: " + err)
    });
}

async function tookangetagentschedule(res,agentId): Promise<string> {
    console.log("Schedule of agent viewed successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Viewing agent Schedule based on response for agentId started",agentId);
    console.log("Schedule seen for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Schedule of tookan agent seen successfully based on agent Id:", agentId)).catch(err => console.log(" Getting Schedule based on agent id failed for: " + err));
	return agentId
}

export async function AssignTookanAgentTask(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Assign Tookan agent Task for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        team_id: newValue.team_id,
        fleet_id: newValue.fleet_id,
        notify: newValue.notify,
        geofence: newValue.geofence,
        job_status: newValue.job_status
      };
    
      //Assign task to agents in tookan
    console.log('Assign tasks to tookan agent for options: ', options);
    return client.assignAgentToTask(options).then(res => {
        return assigntasktoagent(res,agentId);   
    })
    .catch(err => {
        console.log("Assigning tasks to tookan agent failed: " + err)
    });
}

async function assigntasktoagent(res,agentId): Promise<string> {
    console.log("Task assigned successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Assigning agent task based on response for agentId started",agentId);
    console.log("Task assigned to agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Task assigned successfully based on agent Id:", agentId)).catch(err => console.log("Task assigning based on agent id failed for: " + err));
	return agentId
}
