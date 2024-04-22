import SettingsList from "./SettingsList";

export default function SettingsListContainer({
  getAllSettings,
  incrementDataModifiedCounter,
  paginateSettings,
}) {
  return (
    <div>
      <SettingsList
        getAllSettings={getAllSettings}
        // allSettings={allSettings}
        incrementDataModifiedCounter={incrementDataModifiedCounter}
        paginateSettings={paginateSettings}
      />
    </div>
  );
}
