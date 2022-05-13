export default function stringParser(data) {
  const parsedData = { ...data };
  if (parsedData.title.length > 17) {
    parsedData.title = parsedData.title.slice(0, 17);
    parsedData.title += '...';
  }

  if (parsedData.description.length > 41) {
    parsedData.description = parsedData.description.slice(0, 42);
    parsedData.description += '...';
  }
  return parsedData;
}
