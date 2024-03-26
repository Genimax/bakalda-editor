import React, { useState, useRef } from "react";
import UploadPic from "../../../assets/upload-icon.svg";
import useEditorStagesStore from "../../../store/useEditorPageStagesStore.js";
import { STAGES_ENUM } from "../../../config/enums.js";

const StartView = () => {
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const setData = useEditorStagesStore((state) => state.setData);
  const setStage = useEditorStagesStore((state) => state.setStage);

  const handleFileChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (
          !(
            json.points &&
            json.initLocation &&
            Array.isArray(json.points) &&
            json.points.every(
              (point) => point.id && point.title && point.description,
            )
          )
        ) {
          throw new Error("Файл не содержит необходимые поля в объектах.");
        }
        setData(json);
        setStage(STAGES_ENUM.EDITING);
      } catch (error) {
        alert("Ошибка при чтении файла: " + error.message);
      }
      setLoading(false);
    };
    reader.readAsText(file);

    // Сбрасываем значение input, чтобы снова срабатывало событие change при выборе того же файла
    event.target.value = "";
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Имитируем клик по скрытому input
  };

  return (
    <div className="start-container">
      {loading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
      <div className="upload-container">
        <p>Загрузите файл с текущими точками:</p>
        <img
          src={UploadPic}
          alt="Кнопка загрузки"
          className="upload-picture"
          onClick={handleClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }} // Скрываем input
          accept=".json"
        />
      </div>
    </div>
  );
};

export default StartView;
