import { STAGES_ENUM } from "../../config/enums.js";
import useEditorStagesStore from "../../store/useEditorPageStagesStore.js";
import Logo from "../../assets/logo.png";
import "./style.scss";

import EditingView from "./components/EditingView.jsx";
import StartView from "./components/StartView.jsx";
import { useEffect } from "react";

const PointEditor = () => {
  useEffect(() => {
    document.title = "Редактор точек - Новая Бакалда";
  }, []);

  const stage = useEditorStagesStore((state) => state.stage);

  return (
    <div className="main-container">
      <img src={Logo} className="logo" alt="Логотип" />
      {stage === STAGES_ENUM.START && <StartView />}
      {stage === STAGES_ENUM.EDITING && <EditingView />}
    </div>
  );
};

export default PointEditor;
