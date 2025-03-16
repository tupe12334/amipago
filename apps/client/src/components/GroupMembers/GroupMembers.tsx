import React from "react";

interface GroupMember {
  id: string;
  name: string;
}

interface GroupMembersProps {
  members?: GroupMember[];
  groupUserId: string;
}

export const GroupMembers = ({ members, groupUserId }: GroupMembersProps) => {
  return (
    <div className="mb-6">
      <h2 id="members-title" className="text-lg font-medium mb-2">
        חברי קבוצה
      </h2>
      <div className="bg-gray-50 rounded-lg p-4">
        {members && members.length > 0 ? (
          <ul className="space-y-2" id="members-list" aria-label="קבוצת חברים">
            {members.map((member) => (
              <li key={member.id} className="flex items-center">
                <i
                  className="fa fa-user-circle text-gray-500 me-2"
                  aria-hidden="true"
                ></i>
                <span className="text-sm">{member.name}</span>
                {groupUserId === member.id && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium ms-2 px-2 py-0.5 rounded-full">
                    מנהל
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">אין חברים בקבוצה זו</p>
        )}
      </div>
    </div>
  );
};
