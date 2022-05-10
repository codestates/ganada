export default function stringParser(data) {
  const parsedData = { ...data };
  if (parsedData.title.length > 18) {
    parsedData.title = parsedData.title.slice(0, 18);
    parsedData.title += '...';
  }

  if (parsedData.description.length > 43) {
    parsedData.description = parsedData.description.slice(0, 43);
    parsedData.description += '...';
  }
  return parsedData;
}
