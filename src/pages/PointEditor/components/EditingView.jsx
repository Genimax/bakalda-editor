import useEditorStagesStore from "../../../store/useEditorPageStagesStore.js";
import PointRow from "./common/PointRow.jsx";
import getMoscowTime from "../../../utils/getMoscowTime.js";

const EditingView = () => {
  const data = useEditorStagesStore((state) => state.data);
  const points = useEditorStagesStore((state) => state.data.points);
  const addPoint = useEditorStagesStore((state) => state.addPoint);

  const handleDownload = () => {
    data.lastUpdated = getMoscowTime();
    // Преобразование объекта data в строку JSON
    const jsonString = JSON.stringify(data);
    // Создание blob объекта
    const blob = new Blob([jsonString], { type: "application/json" });
    // Создание URL для blob объекта
    const url = URL.createObjectURL(blob);

    // Создание временной ссылки для скачивания
    const link = document.createElement("a");
    link.href = url;
    link.download = "points.json"; // Название файла для скачивания

    // Имитация нажатия на ссылку
    document.body.appendChild(link);
    link.click();

    // Очистка после скачивания
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Освобождение URL объекта
  };

  return (
    <div className="center-container">
      <div className="editing-container">
        <div className="points-container">
          {points.map((point) => (
            <PointRow point={point} key={point.id} />
          ))}
          <div className="buttons-container">
            <button className="button-add-point" onClick={addPoint}>
              ➕
            </button>
            <button className="button-download" onClick={handleDownload}>
              Скачать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingView;
