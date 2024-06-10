import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const UpdateAreaSede = ({ item, onClose, refreshData }) => {
  const [sedes, setSedes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedSede, setSelectedSede] = useState(item.sede_area || "");
  const [selectedArea, setSelectedArea] = useState(item.area_AreaSede || "");
  const [selectedAdmin, setSelectedAdmin] = useState(item.persona_administra || "");
  const [error, setError] = useState("");

  const usuarios = [
    { id: 1, nombre: "Admin 1" },
    { id: 2, nombre: "Admin 2" },
    { id: 3, nombre: "Admin 3" }
  ];

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await axiosClient.get("sede/");
        setSedes(response.data);
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
        GlobalAlert.error("Hubo un error al obtener las sedes.");
      }
    };

    const fetchAreas = async () => {
      try {
        const response = await axiosClient.get("/area/");
        setAreas(response.data);
      } catch (error) {
        console.error("Error al obtener las áreas:", error);
        GlobalAlert.error("Hubo un error al obtener las áreas.");
      }
    };

    fetchSedes();
    fetchAreas();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedSede || !selectedArea || !selectedAdmin) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axiosClient.put(`/areaSede/${item.id}/`, {
        sede_area: selectedSede,
        area_AreaSede: selectedArea,
        persona_administra: selectedAdmin
      });
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Sede actualizada correctamente.");
      refreshData(); // Refrescar datos de la tabla
      onClose(); // Cierra el modal después de enviar la petición
    } catch (error) {
      console.error("Error al enviar la petición:", error);
      GlobalAlert.error("Hubo un error al actualizar la sede. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Actualizar Sede"
      children={
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 w-full">
            <label className="block">
          <div>
          <span className="text-gray-700">Selecciona una sede</span>
          </div>
              <select
                value={selectedSede}
                onChange={(e) => setSelectedSede(e.target.value)}
                className="border w-full rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"                required
              >
                <option value="" disabled>Seleccione una sede</option>
                {sedes.map((sede) => (
                  <option key={sede.id} value={sede.id}>
                    {sede.nombre_sede}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
        <div>
        <span className="text-gray-700">Selecciona un área</span>
        </div>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="border w-full rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"                required
              >
                <option value="" disabled>Seleccione un área</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.nombre_area}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
             <div>
             <span className="text-gray-700">Selecciona un administrador</span>
             </div>
              <select
                value={selectedAdmin}
                onChange={(e) => setSelectedAdmin(e.target.value)}
                className="border w-full rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"                required
              >
                <option value="" disabled>Seleccione un administrador</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre}
                  </option>
                ))}
              </select>
            </label>

            {error && <p className="text-red-500">{error}</p>}
            <Button color="primary" type="submit">
              Enviar
            </Button>
          </div>
        </form>
      }
      footer={(onClose) => (
        <Button color="danger" variant="light" onClick={onClose}>
          Cerrar
        </Button>
      )}
    />
  );
};

export default UpdateAreaSede;
