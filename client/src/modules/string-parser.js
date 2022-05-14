export default function stringParser(data) {
  const parsedData = { ...data };
  if (parsedData.title.length > 30) {
    // 17
    parsedData.title = parsedData.title.slice(0, 17);
    parsedData.title += '...';
  }

  if (parsedData.description.length > 50) {
    // 41
    parsedData.description = parsedData.description.slice(0, 50);
    parsedData.description += '...';
  }
  return parsedData;
}
