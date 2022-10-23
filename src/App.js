import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from './Components/Signup';
import LoginAdmin from './Components/Admin/Registration/Login';
import LoginAssessor from './Components/Teacher/Registration/Login';
import LoginStudent from './Components/Student/Registration/Login';
import LoginProctorer from './Components/Proctorer/Registration/Login';
import DashboardAdmin from './Components/Admin/Index';
import DashboardProctorer from './Components/Proctorer/Index';
import DashboardAssessor from './Components/Teacher/Index';
import DashboardStudent from './Components/Student/Index';
import ExamAdmin from './Components/Admin/exam';
import CandidateAdmin from './Components/Admin/candidates';
import QuestionAdmin from './Components/Admin/questions';
import StatisticsAdmin from './Components/Admin/statistics';
import ResultAssessor from './Components/Teacher/result';
import PresenceAssessor from './Components/Teacher/presence';
import VivaAssessor from './Components/Teacher/viva';
import VivalinkAssessor from './Components/Teacher/vivalink';
import MonitorProctorer from './Components/Proctorer/monitor';
import StarttestStudent from './Components/Student/starttest';
import SubmittestStudent from './Components/Student/submittest';
import TestStudent from './Components/Student/test';
import AddcandidateAdmin from './Components/Admin/addCandidate';
import AddexamAdmin from './Components/Admin/addExam';
import AddquestionAdmin from './Components/Admin/addQuestion';
import Test from './test';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/testing-page" element={<Test/>} exact />
          <Route path="/" element={<Signup/>} exact />
          <Route path="/loginAdmin" element={<LoginAdmin/>} exact/>
          <Route path="/loginAssessor" element={<LoginAssessor/>} exact/>
          <Route path="/loginStudent" element={<LoginStudent/>} exact/>
          <Route path="/loginProctorer" element={<LoginProctorer/>} exact/>
          <Route path="/dashboardAdmin" element={<DashboardAdmin/>} exact/>
          <Route path="/dashboardProctorer" element={<DashboardProctorer/>} exact/>
          <Route path="/dashboardAssessor" element={<DashboardAssessor/>} exact/>
          <Route path="/dashboardStudent" element={<DashboardStudent/>} exact/>
          <Route path="/examAdmin" element={<ExamAdmin/>} exact/>
          <Route path="/candidateAdmin" element={<CandidateAdmin/>}  exact/>
          <Route path="/questionAdmin" element={<QuestionAdmin/>} exact/>
          <Route path="/statisticsAdmin" element={<StatisticsAdmin/>} exact/>
          <Route path="/resultAssessor" element={<ResultAssessor/>} exact/>
          <Route path="/presenceAssessor" element={<PresenceAssessor/>} exact/>
          <Route path="/vivaAssessor" element={<VivaAssessor/>} exact/>
          <Route path="/vivalinkAssessor" element={<VivalinkAssessor/>} exact/>
          <Route path="/monitorProctorer" element={<MonitorProctorer/>} exact/>
          <Route path="/starttestStudent/:id" element={<StarttestStudent/>} exact/>
          <Route path="/submittestStudent" element={<SubmittestStudent/>} exact/>
          <Route path="/testStudent/:id" element={<TestStudent/>} exact/>
          <Route path="/addcandidateAdmin" element={<AddcandidateAdmin/>} exact/>
          <Route path="/addexamAdmin" element={<AddexamAdmin/>} exact/>
          <Route path="/addquestionAdmin" element={<AddquestionAdmin/>} exact/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
