import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCode,
  FaPlus,
  FaTrash,
  FaArrowRight,
} from "react-icons/fa";

import api from "../api/axios";

interface Project {
  _id: string;
  title: string;
  language: string;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [title, setTitle] =
    useState("");

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const { data } =
        await api.get("/projects");

      setProjects(data);

    } catch (error) {
      console.log(error);
    }
  };

  // CREATE PROJECT
  const createProject = async () => {
    if (!title) return;

    try {
      await api.post("/projects", {
        title,
        language: "javascript",
      });

      setTitle("");

      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE PROJECT
  const deleteProject = async (
    id: string
  ) => {
    try {
      await api.delete(
        `/projects/${id}`
      );

      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects();
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white px-6 py-10 relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-blue-600/20 blur-[140px] rounded-full" />

      <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-purple-600/20 blur-[140px] rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <p className="text-zinc-500 text-sm mb-2">
              Dashboard
            </p>

            <h1 className="text-5xl font-black tracking-tight">
              Your Projects
            </h1>
          </div>

          {/* CREATE PROJECT */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="New project..."
              className="bg-zinc-900/80 border border-zinc-800 focus:border-blue-500 transition outline-none px-5 py-3 rounded-2xl w-[260px]"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <button
              onClick={createProject}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 font-medium hover:scale-105 transition duration-300 shadow-lg shadow-blue-500/20"
            >
              <FaPlus size={12} />
              Create
            </button>
          </div>
        </div>

        {/* EMPTY STATE */}
        {projects.length === 0 && (
          <div className="border border-zinc-800 bg-zinc-900/50 rounded-3xl p-14 text-center">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-6">
              <FaCode className="text-3xl text-zinc-400" />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              No Projects Yet
            </h2>

            <p className="text-zinc-500 max-w-md mx-auto leading-7">
              Create your first project and start coding
              directly from your browser.
            </p>
          </div>
        )}

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6 hover:border-blue-500/40 transition duration-300 hover:-translate-y-1"
            >
              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition duration-300" />

              {/* TOP */}
              <div className="relative z-10 flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center">
                  <FaCode className="text-blue-500 text-xl" />
                </div>

                <span className="text-xs uppercase tracking-wider bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full">
                  {project.language}
                </span>
              </div>

              {/* CONTENT */}
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-3 line-clamp-1">
                  {project.title}
                </h2>

                <p className="text-zinc-500 text-sm leading-6">
                  Open your project and continue building
                  amazing applications.
                </p>
              </div>

              {/* ACTIONS */}
              <div className="relative z-10 flex items-center gap-3 mt-8">
                <button
                  onClick={() =>
                    navigate(
                      `/editor/${project._id}`
                    )
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
                >
                  Open
                  <FaArrowRight size={12} />
                </button>

                <button
                  onClick={() =>
                    deleteProject(project._id)
                  }
                  className="w-12 h-12 rounded-2xl border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}