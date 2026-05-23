type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({
  children,
}: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      {children}
    </div>
  );
}