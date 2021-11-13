import api from "./api";

async function getAll() {
    return await api.get(`/candidates`);
}

async function getById(id) {
    return await api.get(`/candidates/${id}`);
}

async function create(data) {
    return await api.post(`/candidates`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

async function update(id, data) {
    return await api.put(`/candidates/${id}`, data);
}

async function deleteCandidate(id) {
    return await api.delete(`/candidates/${id}`);
}

export const Candidate = {
    getAll,
    getById,
    create,
    update,
    delete: deleteCandidate,
};