import { Route, Routes } from "react-router-dom";
import { AddCajuelas } from "../AddCajuelas";
import { AddReducciones } from "../AddReducciones";
import { ConfigPanel } from "../ConfigPanel";
import { HomePage } from "../HomePage";

export const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agregar-cajuelas" element={<AddCajuelas />} />
        <Route path="/agregar-rebajas" element={<AddReducciones />} />
        <Route path="/configurar" element={<ConfigPanel />} />
        {/* <Route path='/users' element={ <UserAdminPage/> }/> */}
      </Routes>
    </>
  );
};
