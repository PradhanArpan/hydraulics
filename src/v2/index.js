import SpecificEnergyFlume from "./SpecificEnergyFlume.jsx";
import JumpLab from "./JumpLab.jsx";
import CrossSection from "./CrossSection.jsx";
import IsovelProbe from "./IsovelProbe.jsx";
import UniformBalance from "./UniformBalance.jsx";
import ShapeOptimizer from "./ShapeOptimizer.jsx";
import NormalDepthSolver from "./NormalDepthSolver.jsx";
import GVFExplorer from "./GVFExplorer.jsx";
import WeirFlumeRating from "./WeirFlumeRating.jsx";
import TransitionFlume from "./TransitionFlume.jsx";

// Unit I: Boundary Layer Theory
import FlatPlateBL from "./FlatPlateBL.jsx";
import ThicknessAreas from "./ThicknessAreas.jsx";
import WallZoom from "./WallZoom.jsx";
import SeparationLab from "./SeparationLab.jsx";

// Unit III: Impact of Jets
import JetForceLab from "./JetForceLab.jsx";
import VelocityTriangle from "./VelocityTriangle.jsx";

// Unit IV: Hydraulic Machines (Turbines & Pumps)
import TurbineChooser from "./TurbineChooser.jsx";
import PeltonDesigner from "./PeltonDesigner.jsx";
import TurbineCutaway from "./TurbineCutaway.jsx";
import PumpMatcher from "./PumpMatcher.jsx";
import RecipCrank from "./RecipCrank.jsx";

// Unit V: Computational Hydraulics & CFD
import MeshLab from "./MeshLab.jsx";

// Lesson Flow v2 widgets, used from markdown as ::widget[<id>]
export const V2_WIDGETS = {
  // Unit II (Open Channel Flow)
  specific_energy_flume: SpecificEnergyFlume,
  jump_lab: JumpLab,
  cross_section: CrossSection,
  isovel_probe: IsovelProbe,
  uniform_balance: UniformBalance,
  shape_optimizer: ShapeOptimizer,
  normal_depth_solver: NormalDepthSolver,
  gvf_explorer: GVFExplorer,
  weir_flume_rating: WeirFlumeRating,
  transition_flume: TransitionFlume,

  // Unit I (Boundary Layer Theory)
  flat_plate_bl: FlatPlateBL,
  thickness_areas: ThicknessAreas,
  wall_zoom: WallZoom,
  separation_lab: SeparationLab,

  // Unit III (Impact of Jets)
  jet_force_lab: JetForceLab,
  velocity_triangle: VelocityTriangle,

  // Unit IV (Hydraulic Machines)
  turbine_chooser: TurbineChooser,
  pelton_designer: PeltonDesigner,
  turbine_cutaway: TurbineCutaway,
  pump_matcher: PumpMatcher,
  recip_crank: RecipCrank,

  // Unit V (Computational Hydraulics & CFD)
  mesh_lab: MeshLab
};
