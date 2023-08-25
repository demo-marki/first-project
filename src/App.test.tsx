import MainApp from "./App";
import {createRoot} from "react-dom/client";
import {act} from "@testing-library/react"

test('renders without crashing', () => {
  act(() => {
    const container = document.createElement('div');
    const root = createRoot(container);
    root.render(<MainApp tab="home" />);
    root.unmount();
  })
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<MainApp/>);
  root.unmount();
});
