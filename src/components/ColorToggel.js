export default function ColorToggel({theme,changeTheme, menuColor, clickEvent }) {
    // Handel the palette of colrs with theme and gsap animation
    
    function Handel(key) {
        clickEvent()
        changeTheme(key)

    }

    return (
        <div ref={menuColor} style={{ display: "flex ", gap: "10px", backgroundColor: 'white', padding: "20px", borderRadius: "5px", marginBottom: "15px", zIndex: "0", opacity: 0 }}  >
            {Object.entries(theme).map(([key, val]) =>
                <div onClick={() => { Handel(key) }} key={key} style={{ backgroundColor: val.palette.primary.main, width: "35px", height: "35px", borderRadius: "50%", cursor: "pointer" }}></div>
            )}
        </div>
    )
}
