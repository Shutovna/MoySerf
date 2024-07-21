package ru.shutovna.myserf.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;

@Entity
@Getter
@Setter
public class DeviceMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long userId;
    private String deviceDetails;
    private String location;
    private Date lastLoggedIn;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DeviceMetadata that = (DeviceMetadata) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getUserId(), that.getUserId()) &&
                Objects.equals(getDeviceDetails(), that.getDeviceDetails()) &&
                Objects.equals(getLocation(), that.getLocation()) &&
                Objects.equals(getLastLoggedIn(), that.getLastLoggedIn());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUserId(), getDeviceDetails(), getLocation(), getLastLoggedIn());
    }

    @Override
    public String toString() {
        return "DeviceMetadata{" + "id=" + id +
                ", userId=" + userId +
                ", deviceDetails='" + deviceDetails + '\'' +
                ", location='" + location + '\'' +
                ", lastLoggedIn=" + lastLoggedIn +
                '}';
    }
}
