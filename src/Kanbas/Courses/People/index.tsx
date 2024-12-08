import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "./Table";
import * as courseClient from "../client";

export default function People() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { cid } = useParams();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      if (!cid) return;
      const users = await courseClient.findUsersForCourse(cid);
      setUsers(users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <PeopleTable users={users} />
    </div>
  );
}