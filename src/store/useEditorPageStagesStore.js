import create from "zustand";
import { STAGES_ENUM } from "../config/enums.js";
import generateRandomId from "../utils/randomIdGenerator.js";

const useEditorStagesStore = create((set) => ({
  stage: STAGES_ENUM.START,
  setStage: (newStage) => set(() => ({ stage: newStage })),
  resetStage: () => set(() => ({ stage: STAGES_ENUM.START })),
  data: {},
  setData: (newData) => set(() => ({ data: newData })),
  deletePoint: (pointId) =>
    set((state) => ({
      data: {
        ...state.data,
        points: state.data.points.filter((point) => point.id !== pointId),
      },
    })),
  addPoint: () =>
    set((state) => ({
      data: {
        ...state.data,
        points: [
          ...state.data.points,
          {
            id: generateRandomId(16),
            title: "",
            description: "",
            latitude: null,
            longitude: null,
          },
        ],
      },
    })),
}));

export default useEditorStagesStore;
