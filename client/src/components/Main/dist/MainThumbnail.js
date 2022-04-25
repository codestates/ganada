"use strict";
exports.__esModule = true;
var react_1 = require("react");
var gi_1 = require("react-icons/gi");
var use_interval_1 = require("use-interval");
function MainThumbnail() {
    var images = [
        process.env.PUBLIC_URL + "/img/1.png",
        process.env.PUBLIC_URL + "/img/2.png",
        process.env.PUBLIC_URL + "/img/3.png",
    ];
    var TotalSlide = images.length - 1;
    var _a = react_1.useState(0), currentSlide = _a[0], setCurrentSlide = _a[1];
    var slideRef = react_1.useRef(null);
    var nextSlide = function () {
        if (currentSlide >= TotalSlide) {
            setCurrentSlide(0);
        }
        else {
            setCurrentSlide(currentSlide + 1);
        }
    };
    use_interval_1["default"](function () {
        nextSlide();
    }, 4000);
    var left = function () {
        setCurrentSlide(0);
        slideRef.current.style.transform = "translateX(0vw)";
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
    };
    var middle = function () {
        setCurrentSlide(1);
        slideRef.current.style.transform = "translateX(-100vw)";
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
    };
    var right = function () {
        setCurrentSlide(2);
        slideRef.current.style.transform = "translateX(-200vw)";
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
    };
    react_1.useEffect(function () {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = "translateX(-" + currentSlide + "00vw)";
    }, [currentSlide]);
    return (React.createElement("section", { className: "mainThumb" },
        React.createElement("div", { className: "mainThumbnail" },
            React.createElement("div", { className: "main-slide" },
                React.createElement(gi_1.GiPlainCircle, { className: currentSlide === 0 ? 'main-slide-btn active' : 'main-slide-btn ', onClick: left }),
                React.createElement(gi_1.GiPlainCircle, { className: currentSlide === 1 ? 'main-slide-btn active' : 'main-slide-btn', onClick: middle }),
                React.createElement(gi_1.GiPlainCircle, { className: currentSlide === 2 ? 'main-slide-btn active' : 'main-slide-btn', onClick: right })),
            React.createElement("div", { className: "slider-contain" },
                React.createElement("div", { className: "sliderContainer", ref: slideRef },
                    React.createElement("div", { className: "slider" },
                        React.createElement("img", { src: images[0], alt: "slide1" }),
                        React.createElement("div", { className: "slider-left-txt" },
                            "\uAC00 ",
                            React.createElement("br", null),
                            React.createElement("br", null),
                            "\uB2E4"),
                        React.createElement("div", { className: "slider-middle-txt" }, "\uB098"),
                        React.createElement("div", { className: "slider-right-txt" },
                            "\uC7A5 ",
                            React.createElement("br", null),
                            React.createElement("br", null),
                            "\uC6B4"),
                        React.createElement("div", { className: "slider-right-re-txt" }, "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\uC21C\uAC04\uC744 \uB2F4\uB2E4")),
                    React.createElement("div", { className: "slider" },
                        React.createElement("img", { src: images[1], alt: "slide2" }),
                        React.createElement("div", { className: "slider-left-txt" },
                            "\uAC00 ",
                            React.createElement("br", null),
                            React.createElement("br", null),
                            "\uB2E4"),
                        React.createElement("div", { className: "slider-middle-two-txt" }, "\u00A0\u00A0\uC544\uB984"),
                        React.createElement("div", { className: "slider-right-txt" },
                            "\uC7A5 ",
                            React.createElement("br", null),
                            React.createElement("br", null),
                            "\uC6B4"),
                        React.createElement("div", { className: "slider-right-re-txt" }, "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\uC21C\uAC04\uC744 \uB2F4\uB2E4")),
                    React.createElement("div", { className: "slider" },
                        React.createElement("img", { src: images[2], alt: "slide2" }),
                        React.createElement("div", { className: "slider-left-txt" },
                            "\uAC00 ",
                            React.createElement("br", null),
                            React.createElement("br", null),
                            "\uB2E4"),
                        React.createElement("div", { className: "slider-middle-two-txt" }, "\u00A0\u00A0\uC6B0\uB9AC"),
                        React.createElement("div", { className: "slider-right-txt" },
                            "\uC7A5 ",
                            React.createElement("br", null),
                            React.createElement("br", null),
                            "\uC6B4"),
                        React.createElement("div", { className: "slider-right-re-txt" }, "\uC21C\uAC04\uC744 \uB2F4\uB2E4")))))));
}
exports["default"] = MainThumbnail;
