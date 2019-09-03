
export default function CopyModuleHoc(MainComponentInp, WrappedComponent) {
  const MainComponent = MainComponentInp;
  MainComponent.navigationOptions = WrappedComponent.navigationOptions;

  return MainComponent;
}
