export function FetchGear({data}) {
  for (let char of data) {
    let chargear;
    fetch("/characters/" + char.id + ".json")
      .then((response) => response.json())
      .then((data) => {
        chargear = data;
        char.gearTiers = chargear?.data?.gearTiers;
      });
  }
  return data;
}
