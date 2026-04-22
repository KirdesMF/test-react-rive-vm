import {
	Alignment,
	Fit,
	Layout,
	useRive,
	useViewModel,
	useViewModelInstance,
	useViewModelInstanceNumber,
	useViewModelInstanceTrigger,
} from "@rive-app/react-webgl2";
import { useEffect } from "react";
import "./App.css";

function App() {
	const { rive, RiveComponent } = useRive({
		src: "/side_menu_buttons.riv",
		stateMachines: "Main_SM",
		autoplay: true,
		autoBind: true,
		layout: new Layout({
			fit: Fit.Contain,
			alignment: Alignment.Center,
		}),
	});

	const viewModel = useViewModel(rive);
	const viewModelInstance = useViewModelInstance(viewModel, { rive });
	const { value: buttonQuantity, setValue: setButtonQuantity } =
		useViewModelInstanceNumber("buttonQuantity", viewModelInstance);

	useViewModelInstanceTrigger("button1/click", viewModelInstance, {
		onTrigger: () => {
			console.log("Triggered: button1/click");
		},
	});
	useViewModelInstanceTrigger("button2/click", viewModelInstance, {
		onTrigger: () => {
			console.log("Triggered: button2/click");
		},
	});
	useViewModelInstanceTrigger("button3/click", viewModelInstance, {
		onTrigger: () => {
			console.log("Triggered: button3/click");
		},
	});
	useViewModelInstanceTrigger("button4/click", viewModelInstance, {
		onTrigger: () => {
			console.log("Triggered: button4/click");
		},
	});

	useEffect(() => {
		if (!viewModelInstance) {
			return;
		}
		console.log("ViewModel ready");
	}, [viewModelInstance]);

	useEffect(() => {
		if (buttonQuantity === null || buttonQuantity === 4) {
			return;
		}
		setButtonQuantity(4);
		console.log("Set buttonQuantity to 4 (show all buttons)");
	}, [buttonQuantity, setButtonQuantity]);

	return (
		<main className="app-shell">
			<div className="rive-stage">
				<RiveComponent />
			</div>
		</main>
	);
}

export default App;
