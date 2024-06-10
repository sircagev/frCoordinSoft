import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";
import { useDisclosure } from "@nextui-org/react"; // Asegúrate de importar useDisclosure

export const RegisterSede = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Cambiado de onOpenChange a onClose
  const [nombreSede, setNombreSede] = useState("");
  const [direccionSede, setDireccionSede] = useState("");
  const [centros, setCentros] = useState([]);
  const [selectedCentro, setSelectedCentro] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await axiosClient.get("/centro/");
        setCentros(response.data);
      } catch (error) {
        console.error("Error al obtener los centros:", error);
        GlobalAlert.error("Hubo un error al obtener los centros.");
      }
    };

    fetchCentros();
  }, []);

  const handleSubmit = async (event) => { // Eliminar onClose de aquí
    event.preventDefault();
    if (!nombreSede || !selectedCentro || !direccionSede) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axiosClient.post("/sede/", {
        nombre_sede: nombreSede,
        centro_sede: {
          nombre: selectedCentro
        },
        direccion_sede: direccionSede
      });
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Sede registrada correctamente.");
      setNombreSede("");
      setSelectedCentro("");
      setDireccionSede("");
      onClose(); // Mover onClose aquí
    } catch (error) {
      console.error("Error al registrar la sede:", error);
      GlobalAlert.error("Hubo un error al registrar la sede.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Registrar Sede</Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onClose} // Cambiado de onOpenChange a onClose
        title="Formulario de Registro de Sede"
        children={
          <form onSubmit={handleSubmit}> {/* Eliminar onClose de aquí */}
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                label="Nombre de la Sede"
                placeholder="Ingrese el nombre de la sede"
                value={nombreSede}
                onChange={(e) => setNombreSede(e.target.value)}
                required
              />
              <Select
                label="Selecciona un centro"
                placeholder="Seleccione un centro"
                value={selectedCentro}
                onChange={(e) => setSelectedCentro(e.target.value)}
                required
              >
                {centros.map((centro) => (
                  <SelectItem key={centro.id} value={centro.nombre}>
                    {centro.nombre}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type="text"
                label="Dirección de la Sede"
                placeholder="Ingrese la dirección de la sede"
                value={direccionSede}
                onChange={(e) => setDireccionSede(e.target.value)}
                required
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button color="primary" type="submit">
                Enviar
              </Button>
            </div>
          </form>
        }
        footer={() => ( // Cambiado a () => en lugar de (onClose) =>
          <Button color="danger" variant="light" onClick={onClose}>
            Cerrar
          </Button>
        )}
      />
    </div>
  );
};

export default RegisterSede;
