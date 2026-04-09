/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import QuestLearn from "./pages/QuestLearn";
import CodeRange from "./pages/CodeRange";
import QuestBattle from "./pages/QuestBattle";
import CodePouch from "./pages/CodePouch";
import QuestSnippets from "./pages/QuestSnippets";
import QuestPrompts from "./pages/QuestPrompts";
import QuestQuiz from "./pages/QuestQuiz";
import ArticleQuest from "./pages/ArticleQuest";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learn" element={<QuestLearn />} />
          <Route path="/range" element={<CodeRange />} />
          <Route path="/battle" element={<QuestBattle />} />
          <Route path="/pouch" element={<CodePouch />} />
          <Route path="/snippets" element={<QuestSnippets />} />
          <Route path="/prompts" element={<QuestPrompts />} />
          <Route path="/quiz" element={<QuestQuiz />} />
          <Route path="/articles" element={<ArticleQuest />} />
        </Routes>
      </Layout>
    </Router>
  );
}
