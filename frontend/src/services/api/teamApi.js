import api from "./config";

export const getAllTeams = async () => {
  const response = await api.get("/api/teams");
  return response.data;
};

export const getTeamById = async (id) => {
  const response = await api.get(`/api/teams/${id}`);
  return response.data;
};

export const createTeam = async (teamData) => {
  const response = await api.post("/api/teams", teamData);
  return response.data;
};

export const updateTeam = async (id, teamData) => {
  const response = await api.put(`/api/teams/${id}`, teamData);
  return response.data;
};

export const deleteTeam = async (id) => {
  await api.delete(`/api/teams/${id}`);
};

export const getTeamMembers = async (teamId) => {
  const response = await api.get(`/api/teams/${teamId}/members`);
  return response.data;
};

export const addMemberToTeam = async (teamId, member) => {
  const response = await api.post(`/api/teams/${teamId}/members`, member);
  return response.data;
};

export const updateTeamMember = async (teamId, memberId, member) => {
  const response = await api.put(`/api/teams/${teamId}/members/${memberId}`, member);
  return response.data;
};

export const deleteTeamMember = async (teamId, memberId) => {
  await api.delete(`/api/teams/${teamId}/members/${memberId}`);
};
