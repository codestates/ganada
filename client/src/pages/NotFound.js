function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 64,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <div>404</div>
      <div>정확한 경로를 입력해 주세요</div>
    </div>
  );
}

export default NotFound;
