// Trip socket handler — manages room membership for realtime trip updates.
// Business logic (state transitions) stays in trip.service; this file only
// handles the socket plumbing.
const register = (io, socket) => {
  // Client joins trip room to receive realtime status updates + location
  socket.on('trip:join', (tripId) => {
    if (!tripId) return;
    socket.join(`trip:${tripId}`);
    socket.data.activeTripId = tripId;
  });

  socket.on('trip:leave', (tripId) => {
    if (!tripId) return;
    socket.leave(`trip:${tripId}`);
    if (socket.data.activeTripId === tripId) {
      socket.data.activeTripId = null;
    }
  });
};

module.exports = { register };
