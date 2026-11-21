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

// Lesson Flow v2 widgets, used from markdown as ::widget[<id>]
export const V2_WIDGETS = {
  specific_energy_flume: SpecificEnergyFlume,
  jump_lab: JumpLab,
  cross_section: CrossSection,
  isovel_probe: IsovelProbe,
  uniform_balance: UniformBalance,
  shape_optimizer: ShapeOptimizer,
  normal_depth_solver: NormalDepthSolver,
  gvf_explorer: GVFExplorer,
  weir_flume_rating: WeirFlumeRating,
  transition_flume: TransitionFlume
};
