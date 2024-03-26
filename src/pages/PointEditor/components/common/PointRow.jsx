import { useEffect, useRef, useState } from "react";
import DeleteButton from "../../../../assets/delete-button.svg";
import ArrowButton from "../../../../assets/arrow-up.svg";
import useEditorStagesStore from "../../../../store/useEditorPageStagesStore.js";

const PointRow = ({ point }) => {
  const [title, setTitle] = useState(point.title);
  const [description, setDescription] = useState(point.description);
  const [latitude, setLatitude] = useState(point.latitude);
  const [longitude, setLongitude] = useState(point.longitude);
  const [hidePoint, setHidePoint] = useState(!latitude && !longitude);

  const [opened, setOpened] = useState(!title);

  const [imageName, setImageName] = useState(point.image || "");
  const [videoName, setVideoName] = useState(point.video || "");
  const [audioName, setAudioName] = useState(point.audio || "");

  const fileInputImage = useRef(null);
  const fileInputVideo = useRef(null);
  const fileInputAudio = useRef(null);

  const deletePoint = useEditorStagesStore((state) => state.deletePoint);
  const points = useEditorStagesStore((state) => state.data.points);

  useEffect(() => {
    const current = points.find((p) => p.id === point.id);
    current.title = title;
    current.description = description;
    current.latitude = latitude;
    current.longitude = longitude;
    current.image = imageName;
    current.video = videoName;
    current.audio = audioName;
  }, [
    title,
    description,
    latitude,
    longitude,
    imageName,
    videoName,
    audioName,
  ]);

  // Функция для обработки выбора файла
  const handleFileSelect = (e, setState) => {
    if (e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setState(fileName); // Обновляем состояние соответствующим именем файла
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setHidePoint(isChecked);

    if (isChecked) {
      setLatitude(null);
      setLongitude(null);
    } else {
      setLatitude(0);
      setLongitude(0);
    }
  };

  const handleDelete = () => {
    deletePoint(point.id);
    console.log(points);
  };

  return (
    <>
      {!opened && (
        <div
          className="point-container closed"
          onClick={!opened && (() => setOpened(!opened))}
        >
          <h3>Заголовок:</h3>
          <p>{title}</p>
        </div>
      )}
      {opened && (
        <div className={"point-container opened"}>
          <div className="point-row">
            <h3>Заголовок:</h3>
            <input
              className="text-long-input"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="point-row">
            <h3>Скрыть точку:</h3>
            <input
              type="checkbox"
              name="hide"
              checked={hidePoint}
              onChange={handleCheckboxChange}
            />
          </div>
          {!hidePoint && (
            <div className="point-row">
              <h3>Координаты:</h3>
              <div className="double-input">
                <input
                  className="text-short-input"
                  type="text"
                  value={latitude}
                  onChange={(e) =>
                    setLatitude(e.target.value.replaceAll(",", "."))
                  }
                />
                <input
                  className="text-short-input"
                  type="text"
                  value={longitude}
                  onChange={(e) =>
                    setLongitude(e.target.value.replaceAll(",", "."))
                  }
                />
              </div>
            </div>
          )}
          <div className="point-row">
            <h3>ID:</h3>
            <p>{point.id}</p>
          </div>
          <div className="point-row description">
            <h3>Описание:</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="point-row">
            <h3>Название файла картинки:</h3>
            <p
              className="file-name"
              onClick={() => fileInputImage.current.click()}
            >
              {imageName || "Выберите файл"}
            </p>
            <input
              type="file"
              ref={fileInputImage}
              onChange={(e) => handleFileSelect(e, setImageName)}
              style={{ display: "none" }} // Скрываем input
            />
          </div>
          <div className="point-row">
            <h3>Название файла видео:</h3>
            <p
              className="file-name"
              onClick={() => fileInputVideo.current.click()}
            >
              {videoName || "Выберите файл"}
            </p>
            <input
              type="file"
              ref={fileInputVideo}
              onChange={(e) => handleFileSelect(e, setVideoName)}
              style={{ display: "none" }}
            />
          </div>
          <div className="point-row">
            <h3>Название файла аудио:</h3>
            <p
              className="file-name"
              onClick={() => fileInputAudio.current.click()}
            >
              {audioName || "Выберите файл"}
            </p>
            <input
              type="file"
              ref={fileInputAudio}
              onChange={(e) => handleFileSelect(e, setAudioName)}
              style={{ display: "none" }}
            />
          </div>
          <button className="delete-button" onClick={handleDelete}>
            <img src={DeleteButton} alt="Кнопка удаления" />
          </button>
          <div className="pack-up" onClick={() => setOpened(false)}>
            <p>Свернуть</p>
            <img src={ArrowButton} alt="кнопка" />
          </div>
        </div>
      )}
    </>
  );
};

export default PointRow;
