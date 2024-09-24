#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <net/if.h>
#include <sys/ioctl.h>
#include <sys/socket.h>
#include <linux/can.h>
#include <linux/can/raw.h>

// Function to open a CAN socket
int open_can_socket(const char *interface_name) {
    int socket_fd;
    struct sockaddr_can addr;
    struct ifreq ifr;

    // Create a socket
    socket_fd = socket(PF_CAN, SOCK_RAW, CAN_RAW);
    if (socket_fd == -1) {
        perror("Error creating socket");
        return -1;
    }

    // Get the interface index
    strcpy(ifr.ifr_name, interface_name);
    if (ioctl(socket_fd, SIOCGIFINDEX, &ifr) == -1) {
        perror("Error getting interface index");
        close(socket_fd);
        return -1;
    }

    // Bind the socket to the CAN interface
    addr.can_family = AF_CAN;
    addr.can_ifindex = ifr.ifr_ifindex;
    if (bind(socket_fd, (struct sockaddr *)&addr, sizeof(addr)) == -1) {
        perror("Error binding socket to CAN interface");
        close(socket_fd);
        return -1;
    }

    return socket_fd;
}

// Function to read a CAN frame
int read_can_frame(int socket_fd, struct can_frame *frame) {
    int nbytes = read(socket_fd, frame, sizeof(struct can_frame));
    if (nbytes < 0) {
        perror("Error reading CAN frame");
        return -1;
    }
    if (nbytes < sizeof(struct can_frame)) {
        fprintf(stderr, "Incomplete CAN frame read\n");
        return -1;
    }
    return 0;
}

// Function to write a CAN frame
int write_can_frame(int socket_fd, const struct can_frame *frame) {
    int nbytes = write(socket_fd, frame, sizeof(struct can_frame));
    if (nbytes != sizeof(struct can_frame)) {
        perror("Error writing CAN frame");
        return -1;
    }
    return 0;
}

// Function to close a CAN socket
void close_can_socket(int socket_fd) {
    close(socket_fd);
}

// Example usage
int main() {
    const char *interface_name = "can0";  // Change this to your CAN interface name
    int socket_fd = open_can_socket(interface_name);
    if (socket_fd == -1) {
        return 1;
    }

    printf("CAN socket opened successfully\n");

    // Example: Write a CAN frame
    struct can_frame tx_frame = {
        .can_id = 0x123,
        .can_dlc = 8,
        .data = {0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88}
    };

    if (write_can_frame(socket_fd, &tx_frame) == 0) {
        printf("CAN frame sent successfully\n");
    }

    // Example: Read a CAN frame
    struct can_frame rx_frame;
    if (read_can_frame(socket_fd, &rx_frame) == 0) {
        printf("Received CAN frame - ID: 0x%X, DLC: %d, Data: ", rx_frame.can_id, rx_frame.can_dlc);
        for (int i = 0; i < rx_frame.can_dlc; i++) {
            printf("%02X ", rx_frame.data[i]);
        }
        printf("\n");
    }

    close_can_socket(socket_fd);
    printf("CAN socket closed\n");

    return 0;
}
