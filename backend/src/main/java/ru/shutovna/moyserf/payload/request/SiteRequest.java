package ru.shutovna.moyserf.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.N;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SiteRequest {
    @NotBlank
    @Length(min = 5, max = 255)
    private String name;
    @Length(max = 10000)
    private String description;
    @NotBlank
    @URL
    private String url;
    private String avatarUrl;
}
