import EmptyData from "../../ui/EmptyData";

function MyCanceledTask() {
  return (
    <EmptyData
      message="No canceled task yet."
      notFull={true}
      // image={"/emptyData.jpg"}
    />
  );
}

export default MyCanceledTask;
