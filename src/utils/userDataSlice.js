import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../api/client";
import { useDispatch } from "react-redux";

const initialState = {
  my_teams: [],
  my_projects: [],
  project_boards: {
    count: 0,
    results: [],
  },
  kanban_project: null,
  notify: {
    showNotification: false,
    status: null,
    message: "",
  },
  inlineNotify: {
    showNotification: false,
    status: null,
    message: "",
    elementId: null,
  },
  team_joining_requests: {
    count: 0,
    results: [],
    status: null,
  },
  force_reload: {
    kanban_bottom: true,
    dashboard: true,
  },
};

export const get_my_teams = createAsyncThunk("data/my_teams", async () => {
  const response = await client.get("my_teams");
  return response;
});

export const get_my_projects = createAsyncThunk(
  "data/my_projects",
  async () => {
    const response = await client.get("my_projects");
    return response;
  }
);

export const get_project = createAsyncThunk(
  "data/kanban",
  async (project_id) => {
    // console.log("fetching project");
    const response = await client.get(`my_projects/${project_id}`);
    return response;
  }
);

export const create_new_project = createAsyncThunk(
  "create/new_project",
  async (data) => {
    const response = await client.post("my_projects/", data);
    return response;
  }
);

export const create_new_team = createAsyncThunk(
  "create/new_team",
  async (data) => {
    const response = client.post("my_teams/", data);
    return response;
  }
);

export const join_team = createAsyncThunk("create/join_team", async (data) => {
  const response = client.post("join_team/", data);
  return response;
});

export const get_join_requests = createAsyncThunk(
  "data/join_requests",
  async (team_id) => {
    const response = client.get(
      `my_teams/${team_id}/join_requests?approved=false&&rejected=false`
    );
    return response;
  }
);

export const get_project_boards = createAsyncThunk(
  "data/project_board",
  async (project_id) => {
    const response = client.get(`my_projects/${project_id}/boards/`);
    return response;
  }
);

export const approve_join_request = createAsyncThunk(
  "action/approve_join_request",
  async ({ team_id, request_id }) => {
    const response = client.post(
      `my_teams/${team_id}/join_requests/${request_id}/approve/`
    );
    return response;
  }
);

export const reject_join_request = createAsyncThunk(
  "action/reject_join_request",
  async ({ team_id, request_id }) => {
    const response = client.post(
      `my_teams/${team_id}/join_requests/${request_id}/reject/`
    );
    return response;
  }
);

export const create_new_board = createAsyncThunk(
  "create/new_board",
  async ({ project_id, data }) => {
    const response = client.post(`my_projects/${project_id}/boards/`, data);
    return response;
  }
);

export const create_new_card = createAsyncThunk(
  "create/new_card",
  async ({ project_id, board_id, data }) => {
    const response = client.post(
      `my_projects/${project_id}/boards/${board_id}/cards/`,
      data
    );
    return response;
  }
);

export const move_card = createAsyncThunk(
  "action/move_card",
  async ({ project_id, board_id, data }) => {
    const response = client.post(
      `my_projects/${project_id}/boards/${board_id}/cards/move_card/`,
      data
    );
    return response;
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    closeNotify(state) {
      state.notify = {
        showNotification: false,
        status: null,
        message: "",
      };
    },
    filter_join_requests(state, action) {
      const inlineNotify = action.payload;
      if (!inlineNotify.status) {
        return state;
      }
      const results = state.team_joining_requests.results.filter(
        (item) => item.id !== inlineNotify.elementId
      );
      state.team_joining_requests.count -= 1;
      state.team_joining_requests.results = results;
    },
    closeInlineNotify(state) {
      state.inlineNotify = {
        showNotification: false,
        status: null,
        message: "",
        elementId: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_my_teams.fulfilled, (state, action) => {
        state.my_teams = action.payload.results;
      })
      .addCase(get_my_projects.fulfilled, (state, action) => {
        state.my_projects = action.payload.results;
      })
      .addCase(get_project.fulfilled, (state, action) => {
        state.kanban_project = action.payload;
      })
      .addCase(create_new_project.rejected, (state, action) => {
        state.notify = {
          showNotification: true,
          status: false,
          message: "Some error occured! Try again...",
        };
      })
      .addCase(create_new_project.fulfilled, (state, action) => {
        state.my_projects.push(action.payload);
        state.notify = {
          showNotification: true,
          status: true,
          message: "Project created successfully!",
        };
      })
      .addCase(create_new_team.rejected, (state) => {
        state.notify = {
          showNotification: true,
          status: false,
          message: "Some error occured while creating new team! Try again...",
        };
      })
      .addCase(create_new_team.fulfilled, (state, action) => {
        state.my_teams.push(action.payload);
        state.notify = {
          showNotification: true,
          status: true,
          message: "Team created successfully!",
        };
      })
      .addCase(join_team.rejected, (state, action) => {
        state.notify = {
          showNotification: true,
          status: false,
          message: "Possibly invalid code!",
        };
      })
      .addCase(join_team.fulfilled, (state, action) => {
        if (
          action.payload?.detail ===
          "You are already a member of the team or have a pending request"
        ) {
          state.notify = {
            showNotification: true,
            status: true,
            message:
              "You are already a member of the team, or have a pending request!",
          };
        } else {
          state.notify = {
            showNotification: true,
            status: true,
            message: "Joining request successfully made.",
          };
        }
      })
      .addCase(get_join_requests.fulfilled, (state, action) => {
        state.team_joining_requests = {
          count: action.payload.count,
          results: action.payload.results,
          status: "success",
        };
      })
      .addCase(get_project_boards.fulfilled, (state, action) => {
        state.project_boards = {
          count: action.payload.count,
          results: action.payload.results,
        };
      })
      .addCase(approve_join_request.rejected, (state) => {
        state.inlineNotify = {
          showNotification: true,
          status: false,
          message: "Some error occured!",
          elementId: null,
        };
      })
      .addCase(approve_join_request.fulfilled, (state, action) => {
        const approved_request_id = action.payload.id;
        state.inlineNotify = {
          showNotification: true,
          status: true,
          message: "Approved!",
          elementId: approved_request_id,
        };
        state.force_reload.dashboard = !state.force_reload.dashboard;
      })
      .addCase(reject_join_request.rejected, (state) => {
        state.inlineNotify = {
          showNotification: true,
          status: false,
          message: "Some error occured!",
          elementId: null,
        };
      })
      .addCase(reject_join_request.fulfilled, (state, action) => {
        const rejected_request_id = action.payload.id;
        state.inlineNotify = {
          showNotification: true,
          status: true,
          message: "Rejected!",
          elementId: rejected_request_id,
        };
      })
      .addCase(create_new_board.rejected, (state) => {
        state.notify = {
          showNotification: true,
          status: false,
          message: "Some error occured! Try again...",
        };
      })

      .addCase(create_new_board.fulfilled, (state, action) => {
        // state.project_boards.results.push(action.payload);
        // state.project_boards.count++;
        state.notify = {
          showNotification: true,
          status: true,
          message: "Board created successfully!",
        };

        state.force_reload.kanban_bottom = !state.force_reload.kanban_bottom;
      })
      .addCase(create_new_card.rejected, (state) => {
        state.notify = {
          showNotification: true,
          status: false,
          message: "Some error occured! Try again...",
        };
      })
      .addCase(create_new_card.fulfilled, (state, action) => {
        // console.log("response from card fulfilled");
        console.log(action.payload);
        state.notify = {
          showNotification: true,
          status: true,
          message: "Card created successfully!",
        };
        state.force_reload.kanban_bottom = !state.force_reload.kanban_bottom;
      })
      .addCase(move_card.rejected, (state, action) => {
        // console.log("rejected", action.payload);
        state.notify = {
          showNotification: true,
          status: false,
          message: "Some error occured! Resetting changes...",
        };
        state.force_reload.kanban_bottom = !state.force_reload.kanban_bottom;
      })
      .addCase(move_card.fulfilled, (state, action) => {
        // console.log("moving card");
        // console.log(action.payload);
        if (action.payload.status === 400) {
          state.notify = {
            showNotification: true,
            status: false,
            message: "Position is required!",
          };
        } else {
          state.notify = {
            showNotification: true,
            status: true,
            message: "Card moved successfully!",
          };
          state.force_reload.kanban_bottom = !state.force_reload.kanban_bottom;
        }
      });
  },
});

export const { closeNotify, filter_join_requests, closeInlineNotify } =
  userDataSlice.actions;

export default userDataSlice.reducer;
