import Home from "./views/HomeView/Home";
import Users from "./views/Users/Users";
import Groups from "./views/Groups/Groups";
import Roles from "./views/Roles/Roles";
import AddUpdate from "./views/AddUpdate/AddUpdate";
import LoginView from "./views/Login/LoginView";
import Layout from "./components/Layout/Layout";
import ViewData from "./views/View-Mode/ViewData";
import ProtectedRoute from "./hoc/ProtectedComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { faUser, faUserGroup, faGear } from "@fortawesome/free-solid-svg-icons";
import WithAuth from "./hoc/WithAuth";
import React from "react";
import NotFound from "./components/NotFound/NotFound";

const ProtectedLayout = WithAuth(Layout);

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/" element={<ProtectedLayout />}>
            <Route path="home" element={<Home />} />
            <Route
              path="users"
              element={
                <ProtectedRoute
                  element={<Users />}
                  requiredPerms={[{ name: "Read", entityType: "Users" }]}
                />
              }
            />
            <Route
              path="groups"
              element={
                <ProtectedRoute
                  element={<Groups />}
                  requiredPerms={[{ name: "Read", entityType: "Groups" }]}
                />
              }
            />
            <Route
              path="roles"
              element={
                <ProtectedRoute
                  element={<Roles />}
                  requiredPerms={[{ name: "Read", entityType: "Roles" }]}
                />
              }
            />
            <Route
              path="add-new-user"
              element={
                <ProtectedRoute
                  element={
                    <AddUpdate entity={"user"} icon={faUser} task={"add"} />
                  }
                  requiredPerms={[{ name: "Create", entityType: "Users" }]}
                />
              }
            />
            <Route
              path="add-new-group"
              element={
                <ProtectedRoute
                  element={
                    <AddUpdate
                      entity={"group"}
                      icon={faUserGroup}
                      task={"add"}
                    />
                  }
                  requiredPerms={[{ name: "Create", entityType: "Groups" }]}
                />
              }
            />
            <Route
              path="add-new-role"
              element={
                <ProtectedRoute
                  element={
                    <AddUpdate entity={"role"} icon={faGear} task={"add"} />
                  }
                  requiredPerms={[{ name: "Create", entityType: "Roles" }]}
                />
              }
            />
            <Route
              path="edit-role"
              element={
                <ProtectedRoute
                  element={
                    <AddUpdate entity={"role"} icon={faGear} task={"update"} />
                  }
                  requiredPerms={[{ name: "Update", entityType: "Roles" }]}
                />
              }
            />
            <Route
              path="edit-user"
              element={
                <ProtectedRoute
                  element={
                    <AddUpdate entity={"user"} icon={faUser} task={"update"} />
                  }
                  requiredPerms={[{ name: "Update", entityType: "Users" }]}
                />
              }
            />
            <Route
              path="edit-group"
              element={
                <ProtectedRoute
                  element={
                    <AddUpdate
                      entity={"group"}
                      icon={faUserGroup}
                      task={"update"}
                    />
                  }
                  requiredPerms={[{ name: "Update", entityType: "Groups" }]}
                />
              }
            />
            <Route
              path="/users/:id"
              element={
                <ProtectedRoute
                  element={
                    <ViewData
                      entity={"users"}
                      showRoles={true}
                      showGroups={true}
                      showUsers={false}
                    />
                  }
                  requiredPerms={[{ name: "Read", entityType: "Users" }]}
                />
              }
            />
            <Route
              path="roles/:id"
              element={
                <ProtectedRoute
                  element={
                    <ViewData
                      entity={"roles"}
                      showRoles={false}
                      showGroups={true}
                      showUsers={true}
                    />
                  }
                  requiredPerms={[{ name: "Read", entityType: "Roles" }]}
                />
              }
            />
            <Route
              path="/groups/:id"
              element={
                <ProtectedRoute
                  element={
                    <ViewData
                      entity={"groups"}
                      showRoles={true}
                      showGroups={false}
                      showUsers={true}
                    />
                  }
                  requiredPerms={[{ name: "Read", entityType: "Groups" }]}
                />
              }
            />
            <Route
              path="/users/:id/change-password"
              element={
                <ProtectedRoute
                  element={
                    <AddUpdate
                      entity={"user"}
                      icon={faUser}
                      task={"change-password"}
                    />
                  }
                  requiredPerms={[
                    { name: "Change-Password", entityType: "Users" },
                  ]}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
