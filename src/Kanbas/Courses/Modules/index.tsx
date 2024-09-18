export default function Modules() {
    const handleCollapseAll = () => {
    console.log("Collapse All clicked");
    };

    const handleViewProgress = () => {
        console.log("View Progress clicked");
    };

    const handlePublishAll = () => {
        console.log("Publish All clicked");
    };

    const handleAddModule = () => {
        console.log("+ Module clicked");
    };



    return (
        <div>
            <div className="module-buttons">
                <button onClick={handleCollapseAll}>Collapse All</button>
                <button onClick={handleViewProgress}>View Progress</button>
                <button onClick={handlePublishAll}>Publish All</button>
                <button onClick={handleAddModule}>+ Module</button>
            </div>

            <ul id="wd-modules">
                <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}