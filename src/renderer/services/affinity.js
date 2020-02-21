/*
   Note:
   Affinity is delivered to us from the main process. We need to do this
   since that is where the UI is to load and save projects. The renderer
   process is only used to edit the Project once it has been loaded.

   Later, the main process will also be responsible for loading plugins, which
   may contain UI elements. So it will be best if we handle this before any
   BrowserWindow is loaded.
*/

import Vue from "vue"; // Needed to access the store to set the active project
const Affinity = require("affinity");
const axml = require("affinity-xml");
const { create, test } = Affinity;
import { Tree } from "../lib/ProjectTree";
const { EventEmitter } = require("events");
//import utils from '@/lib/utils'
//import events from './events'
//import affVuex from '@/vuex/modules/affinity.js'
const settings = require("./settings");
import events from "@/services/events";
let Project = require("@/stores/project").default;

let emitter = new EventEmitter();

Affinity.use(axml);

class ProjectContainer {
  constructor(project) {
    this.setProject(project || create());
  }

  setProject(project) {
    if (this.project == project) {
      return;
    }

    let tree = new Tree();

    if (project != null) {
      tree = new Tree(project.root);
      tree.populate();
    }

    Vue.set(this, "project", project);
    Vue.set(this, "tree", tree);
  }
}

export class AffinityUI {
  static toTree(namespace) {
    let tree = new Tree(namespace);
    tree.populate();
    return tree.data;
  }
}

let Container = Vue.observable(new ProjectContainer());
export { Container };

export function createNewProject(populate = false) {
  let project = create();

  if (populate) {
    test.fill.project(project);
  }

  Container.setProject(project);
  return project;
}

export function populate() {
  test.fill.project(Container.project);
}

// events.on('app.loaded', _ => {
//    let project = create(true)
//    console.log(Object.keys(Project))
//    Project.xxx(project)
// })

// events.on('app.loaded', _ => {
//    let project = create(true)
//    let { setProject } = mapActions(['setProject'])
//    setProject({ project })
//    //Vue.store.actions.setProject(project)
// })

/**
 * Creates a new Affinity project
 */
// function create(preFill = false) {
//   let project = Affinity.create();

//   if (preFill) {
//     fill(project, 4);
//   }

//   return project;
// }

/**
 * Loads a project from the given path
 * @param {string} projectPath
 * @return Promise Resolves to a the new Project
 */
function load(projectPath) {
  return new Promise((resolve, reject) => {
    axml.load(projectPath, (err, project) => {
      if (err) {
        return reject(err);
      }

      settings.set("lastProjectPath", projectPath);
      settings.save();
      resolve(project);
    });
  });
}

// TODO: Promisify
function save(project, saveDir) {
  // utils.inspect('[save] project', project)
  // utils.inspect('[save] saveDir', saveDir)

  axml.add(project, saveDir);
  project.commit();
  emitter.emit("project.saved", { project, dir: saveDir });
}

function setActiveProject(project) {
  Container.setProject(project)
}

function fill(project, depth = 3) {
  console.log("filling...");
  Affinity.test.fill.project(project, depth);
  console.log("  : done");
}

export default {
  affinity: Affinity,
  load: load,
  create: create,
  events: emitter,
  fill: fill,
  active: Container.project,
  save: save,
  setActiveProject: setActiveProject,
  types: Affinity.types
};
