import ApiActions from "./ApiActions.ts";
import ApiReducers from "./ApiReducers.ts";
import DispatchType from "./DispatchType.ts";


const programmeDispatchType = new DispatchType("Programme");
export const programmeActions = new ApiActions("api/Programme", programmeDispatchType);
export const programmeReducer = new ApiReducers(programmeDispatchType).reduce

const channelDispatchType = new DispatchType("Channel");
export const channelActions = new ApiActions("api/Channel", channelDispatchType);
export const channelReducer = new ApiReducers(channelDispatchType).reduce

const episodeDispatchType = new DispatchType("Episode");
export const episodeActions = new ApiActions("api/Episode", episodeDispatchType);
export const episodeReducer = new ApiReducers(episodeDispatchType).reduce

const siteMapDispatchType = new DispatchType("SiteMap");
export const siteMapActions = new ApiActions("api/SiteMap", siteMapDispatchType);
export const siteMapReducer = new ApiReducers(siteMapDispatchType).reduce

const userDispatchType = new DispatchType("User");
export const userActions = new ApiActions("api/User", userDispatchType);
export const userReducer = new ApiReducers(userDispatchType).reduce