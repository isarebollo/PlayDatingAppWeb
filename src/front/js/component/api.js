import { HOSTNAME } from "./../component/config.js";

export const obtenerActividades = async () => {
  try {
    const resp = await fetch(HOSTNAME + "/api/actividades", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await resp.json();
  } catch (error) {
    console.log("error " + error);
  }
};

export const unirseEvento = async (eventoId, numParticipantesPorUsuario) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/unirse/evento/" + eventoId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({
      num_participantes_por_usuario: parseInt(numParticipantesPorUsuario),
    }),
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const retirarseDeEvento = async (eventoId) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/retirarse/evento/" + eventoId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const obtenerDatosPerfil = async () => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/perfil", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};
  
export const dejarComentario = async (eventoId, comentario) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/nuevo_comentario/" + eventoId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({
      comentario,
    }),
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const obtenerComentarios = async (eventoId) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/comentarios/" + eventoId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const eliminarComentario = async (comentarioId) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/borrar_comentario/" + comentarioId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const agregarFavorito = async (usuarioFavoritoId) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/agregar_favorito", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({
      usuario_favorito: usuarioFavoritoId
    }),
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const obtenerFavoritos = async () => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/favoritos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const eliminarFavorito = async (usuarioFavoritoId) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/eliminar_favorito/" + usuarioFavoritoId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const invitarUsuario = async (usuarioInvitadoId, eventoId) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/invitar_usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({
      usuario_invitado: usuarioInvitadoId,
      evento: eventoId
    }),
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const obtenerInvitaciones = async () => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/invitaciones", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const eliminarInvitacion = async (invitacionId) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/eliminar_invitacion/" + invitacionId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};

export const obtenerEventos = async () => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/api/eventos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};




