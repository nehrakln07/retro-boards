import { useState, useEffect } from "react"

export default function Card({ color, cardId, categoryId, value, likes, updateCard }) {
  const [editedValue, setEditedValue] = useState(value);
  const [isEditing, setIsEditing] = useState(value ? false : true);

  const handleChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleSubmit = () => {
    updateCard({ c_id: categoryId, id: cardId, action: "UPDATE_VALUE", value: editedValue });
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };


  return (
    <div className={`w-full mb-4 p-2 color-white bg-${color}-500`} style={{ background: `${color}` }}>
      <div className="w-full">
        {isEditing ? (
          <div className="flex relative h-20">
            <textarea
              className="w-full border border-gray-300 rounded-md p-1 mr-2"
              placeholder="Enter text ..."
              value={editedValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button
              disabled={!editedValue}
              className="bg-blue-500 text-white rounded px-3 py-1 absolute right-4 bottom-2"
              onClick={handleSubmit}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#FFFFFF" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
              </svg>

            </button>
          </div>
        ) : (
          <div className="flex relative h-20">
            <div className="border-b text-white border-gray-300 w-full pr-4">{value}</div>

            <button className="ml-2 absolute right-4 top-1" onClick={() => setIsEditing(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#FFFFFF" className="w-4 h-4">
                <path fillRule="evenodd" d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z" clipRule="evenodd" />
              </svg>

            </button>
          </div>
        )
        }
      </div>
      <div className="flex pt-2 justify-between">
        <button
          onClick={() => {
            updateCard({ c_id: categoryId, id: cardId, action: "MOVE_LEFT" });
          }}
          className="cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#FFFFFF" class="w-4 h-4">
            <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>


        </button>

        <button onClick={() => updateCard({ c_id: categoryId, id: cardId, action: "UPDATE_LIKE" })} className="flex text-white cursor-pointer">
          <span className="text-sm mr-1">{likes ? likes : ""}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#FFFFFF" class="w-4 h-4">
            <path d="M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z" />
          </svg>
        </button>
        <button onClick={() => updateCard({ c_id: categoryId, id: cardId, action: "DELETE" })} className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#FFFFFF" class="w-4 h-4">
            <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={() => {
            updateCard({ c_id: categoryId, id: cardId, action: "MOVE_RIGHT" });
          }}
          className="cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#FFFFFF" className="w-4 h-4">
            <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>


        </button>
      </div>
    </div>
  );

}
