import React from 'react';

export default function CreateComment() {
  return (
    <form>
      <textarea name="comment" placeholder="Write your comment here" />
      <button type="submit">Post Comment</button>
    </form>
  );
}